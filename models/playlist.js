const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PlaylistSchema = Schema({
  songs: {
    type: Array,
    items: {
      
    },
  },
  active: Boolean,
  scheduledDate: Date,
  createdAt: Date,
});

const Playlist = mongoose.model('Playlist', PlaylistSchema);

module.exports = User;
