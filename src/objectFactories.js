videogames.objectFactories = {
  'Desktop': function() {
    return new videogames.Desktop();
  }
};

$.extend(scout.objectFactories, videogames.objectFactories);