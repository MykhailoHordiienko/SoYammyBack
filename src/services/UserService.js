const { User } = require('@models')
const { getUserRecipes } = require('./RecipesService')
const { HttpError, compareObjectId, pipelines } = require('@helpers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

class UserService {
  async signup({ email, name, password, avatarUrl }) {
    const user = await User.findOne({ email })
    if (user) {
      throw HttpError(400, `User with ${email} already exist`)
    }
    const hashedPw = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      email,
      password: hashedPw,
      name,
      avatarUrl,
    })

    const payload = { id: newUser._id, name: newUser.name, email }
    const { SECRET_KEY } = process.env
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })

    await User.findByIdAndUpdate(newUser._id, { token })
    newUser.token = token
    return newUser
  }

  async signin({ email, password }) {
    const user = await User.findOne({ email })

    if (!user) throw HttpError(401, 'Email or password invalid')

    const pwCompare = await bcrypt.compare(password, user.password)

    if (!pwCompare) throw HttpError(401, 'Email or password invalid')

    const payload = { id: user._id, name: user.name, email }
    const { SECRET_KEY } = process.env
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' })

    await User.findByIdAndUpdate(user._id, { token })
    user.token = token
    return user
  }

  async signInGoogle(userData) {
    let [user] = await User.find({ email: userData.email })
    let generatedPw
    if (!user) {
      generatedPw = Math.random().toString(36).slice(-8)
      const hashedPw = await bcrypt.hash(generatedPw, 10)
      userData.password = hashedPw
      user = await User.create(userData)
      user.password = generatedPw
    } else {
      user = await User.findByIdAndUpdate(user._id, { token: userData.token })
      user.password = ''
    }
    return { ...user }
  }

  async logout({ id }) {
    await User.findByIdAndUpdate(id, { token: null })
  }

  async edit(id, editingData) {
    const user = await User.findByIdAndUpdate(id, editingData)
    return user
  }

  async current(userId) {
    const user = await User.findById(userId)
    const { total: recipesQt } = await getUserRecipes(userId)
    const createdAtUnix = new Date(user.createdAt).getTime()
    const msInDay = 24 * 60 * 60 * 1000
    const daysInApp = Math.floor((Date.now() - createdAtUnix) / msInDay)
    const favoritesQt = user.favorites.length
    return { ...user._doc, daysInApp, recipesQt, favoritesQt }
  }

  async getShoppingList(userId) {
    const [user] = await User.aggregate(
      pipelines.getShoppingList(mongoose.Types.ObjectId(userId))
    )
    return user ? user.shoppingList : []
  }

  async createShoppingItem(userId, { id, recipeId, amount, measure }) {
    id = mongoose.Types.ObjectId(id)
    recipeId = mongoose.Types.ObjectId(recipeId)

    const { shoppingList } = await User.findById(userId)
    const newItem = { id, recipeId, amount, measure }
    shoppingList.unshift(newItem)
    await User.findByIdAndUpdate(userId, { shoppingList }, { new: true })
    return newItem
  }

  async removeShoppingItem(userId, itemId, recipeIds) {
    const { shoppingList } = await User.findById(userId)
    let filteredList = [...shoppingList]

    const itemToRemove = filteredList.find(({ id }) =>
      compareObjectId(id, itemId)
    )

    if (!itemToRemove) {
      throw HttpError(404)
    }

    recipeIds.forEach(e => {
      filteredList = filteredList.filter(({ id, recipeId }) => {
        return !(compareObjectId(id, itemId) && compareObjectId(e, recipeId))
      })
    })
    await User.findByIdAndUpdate(
      userId,
      { shoppingList: filteredList },
      { new: true }
    )
    return itemToRemove
  }

  async getFavoriteList(userId) {
    return await User.findById(userId).select({ favorites: 1, _id: 0 })
  }

  async addToFavorite(userId, recipeId, errorHandler) {
    const { favorites } = await User.findById(userId)

    if (favorites.find(id => id === recipeId)) {
      throw errorHandler(409, 'Already in favorites')
    }

    const result = await User.findByIdAndUpdate(userId, {
      favorites: [...favorites, recipeId],
    })

    if (!result) {
      throw new Error('Database error')
    }

    return true
  }

  async removeFromFavorite(userId, recipeId, errorHandler) {
    const { favorites } = await User.findById(userId)
    if (!favorites.find(id => id === recipeId)) {
      throw errorHandler(404)
    }

    const _favorites = favorites.filter(id => id !== recipeId)

    const result = await User.findByIdAndUpdate(userId, {
      favorites: [..._favorites],
    })

    if (!result) {
      throw new Error('Database error')
    }

    return true
  }
}

module.exports = new UserService()
