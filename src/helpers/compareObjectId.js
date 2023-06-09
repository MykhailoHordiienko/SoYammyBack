const mongoose = require('mongoose')

const compareObjectId = (id1 = '', id2 = '') => {
  try {
    if (!(id1 instanceof mongoose.Types.ObjectId)) {
      id1 = mongoose.Types.ObjectId(id1)
    }
    if (!(id2 instanceof mongoose.Types.ObjectId)) {
      id2 = mongoose.Types.ObjectId(id2)
    }

    return id1.equals(id2)
  } catch (error) {
    return false
  }
}

module.exports = { compareObjectId }
