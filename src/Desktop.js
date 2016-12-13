videogames.Desktop = function() {
  videogames.Desktop.parent.call(this);

  this.vgMenu = null;
  this.gamesPanel = null;
  this.infoPanel = null;
};
scout.inherits(videogames.Desktop, scout.Desktop);

/*
Viele Nützliche Konzepte in Scout:
- Popups
- Glasspanes
- Scrollbars
- Widget (v.a Konzept für wiederverwendbare Komponenten, setVisible, setEnabled, animateRemoval, etc.)
- Button (v.a. Support für Icons)
- Internationalisierung
- Model kann kompakt als JSON beschrieben werden

Nervig:
- Scout CSS (braucht zu viele Resets, zu viele Settings die nur für Scout/CRM L&F gut sind
  machen viele gute Defaults kaputt: Beispiel Hand-Cursor bei Links). Die Default Styles sollten so sein,
  dass alle Elemente auf dem Screen sichtbar sind (mehr nicht - nicht schön ausgerichtet oder designed)
- Programatische Layouts (sollten nicht default sein)
- Scout Icons Font (wär ein Zufall wenn jemand in seinem Design ein Icon von Scout benutzen möchte)
- Dialog: sollte keinen close handler rendern. Die wahrscheinlichkeit dass der nicht passt ist hoch
  auch wenn er sich per CSS stylen lässt, möchte man ihn im DOM an einer anderen stelle haben, oder in einem
  menü, oder oder oder

Facts:
- Konzept: Komponenten- / Event-basiert -> OK, anderer ansatz als data-binding
-
 */

videogames.Desktop.prototype._init = function(model) {
  videogames.Desktop.parent.prototype._init.call(this, model);

  // FIXME: das sollte default sein, wenn es keine outlines gibt
  this.setNavigationVisible(false);
  this.setNavigationHandleVisible(false);

  var lastGuardian = scout.create('videogames.Game', {
    parent: this,
    title: 'The Last Guardian',
    genre: 'Action Adventure',
    developer: 'Fumito Ueda',
    image: 'img/t-last-guardian.jpg',
    description: 'The Last Guardian ist ein vom japanischen Entwicklerstudio gen DESIGN und dem SIE Japan Studio exklusiv für die PlayStation 4 entwickeltes Spiel des Genre Action-Adventure. Herausgeber ist Sony Interactive Entertainment.'
  });

  var dishonored2 = scout.create('videogames.Game', {
    parent: this,
    title: 'Dishonored 2',
    genre: 'Stealth Action',
    developer: 'Arkane Studios',
    image: 'img/t-dishonored-2.jpg',
    description: 'Dishonored 2 ist ein Stealth-Actionspiel des französischen Entwicklers Arkane Studios, publiziert von Bethesda Softworks. Es erschien am 11. November 2016 für Windows-PCs, Xbox One und PlayStation 4.'
  });

  var deusEx = scout.create('videogames.Game', {
    parent: this, // FIXME: es ist erklärungswürdig, wie man das mit dem parent macht bei composite objects (huhn/ei-problem)
    title: 'Deux Ex Mankind Divided',
    genre: 'Stealth Action',
    developer: 'Square Enix',
    image: 'img/t-deus-ex-mankind-divided.jpg',
    description: 'Deus Ex: Mankind Divided ist ein Actionspiel des kanadische Computerspielentwicklers Eidos Montreal für Windows, Linux, Playstation 4 und Xbox One und der vierte Teil der Computerspielreihe Deus Ex.'
  });

  var dontStarve = scout.create('videogames.Game', {
    parent: this,
    title: 'Don\'t Starve',
    genre: 'Open World Survival',
    developer: 'Klei Entertainment',
    image: 'img/t-dont-starve.jpg',
    description: 'Don’t Starve ist ein Open-World Survival Spiel, das von Klei Entertainment entwickelt und veröffentlicht wurde. Es erschien am 23. April 2013 als digitaler Release.'
  });

  var uncharted = scout.create('videogames.Game', {
    parent: this,
    title: 'Uncharted 4',
    genre: 'Action Adventure',
    developer: 'Naughty Dog',
    image: 'img/t-uncharted4.jpg',
    description: 'Uncharted 4: A Thief’s End ist ein vom amerikanischen Entwicklerstudio Naughty Dog exklusiv für die PlayStation 4 entwickeltes Spiel des Genres Action-Adventure. Herausgeber ist Sony Computer Entertainment.'
  });

  var noMansSky = scout.create('videogames.Game', {
    parent: this,
    title: 'No Man\'s Sky',
    genre: 'Open World, Action',
    developer: 'Hello Games',
    image: 'img/t-no-mans-sky.jpg',
    description: 'No Man’s Sky ist ein Computerspiel des Indie-Entwicklerstudios Hello Games, in dem der Spieler die Figur eines Weltraumentdeckers steuert. Das Spiel erschien in Europa am 10. August 2016 für die PlayStation 4 und am 12. August für Windows.'
  });

  var metalGear = scout.create('videogames.Game', {
    parent: this,
    title: 'Metal Gear Solid V',
    genre: 'Stealth Shooter',
    developer: 'Koijma Productions',
    image: 'img/t-mgs-v.jpg',
    description: 'Metal Gear Solid 5: The Phantom Pain ist ein Computerspiel der Metal-Gear-Solid-Reihe, das von Kojima Productions entwickelt und von Konami veröffentlicht wurde. Das Spiel ist wie die Vorgänger ein Stealth-Shooter und erschien am 1.'
  });

  var games = [dishonored2, lastGuardian, deusEx, dontStarve, uncharted, noMansSky, metalGear];

  this.infoPanel = scout.create('videogames.InfoPanel', {
    parent: this,
    defaultText: this.session.text('WelcomeText')
  });

  this.gamesPanel = scout.create('videogames.GamesPanel', {
    parent: this,
    games: games,
    infoPanel: this.infoPanel
  });

};

videogames.Desktop.prototype._renderProperties = function() {
  videogames.Desktop.parent.prototype._renderProperties.call(this);

  // FIXME das ist falsch: die header instanz im desktop wird erst im renderHeader
  // gemacht. wegen dem !check gehen die menus vom init komplett verloren.
  // Muss ins Desktop#_init Dann kann man auch setMenus im init machen
  this.mainMenu = scout.create('Menu', {
    cssClass: 'desktop-tool-box-item menu-box-item', // FIXME warum werden die nicht automatisch gesetzt?
    horizontalAlignment: -1,
    iconId: 'font:awesomeIcons \uf0c9',
    parent: this
  });
  this.mainMenu.on('doAction', this._onMainMenuAction.bind(this));
  this.setMenus([this.mainMenu]);

  this._renderGamesPanel();
  this._renderInfoPanel();
};

videogames.Desktop.prototype._render = function($parent) {
  videogames.Desktop.parent.prototype._render.call(this, $parent);

  // FIXME das macht man wohl auch nur wenn man Scout committer ist :-(
  // Der Hauptnachteil ist wirklich, dass wenn man mit den bestehenden Scout Widgets arbeiten will, nicht mehr
  // mit Standard Mitteln arbeiten kann, sondern nur noch via API / JavaScript. Man könnte zwar seine eigenen, rein
  // CSS basierten Widgets machen. Aber dann nutzt man ja eigentlich fast nichts mehr von Scout. Das ist Schade, denn
  // viele Widgets wären sehr nützlich, z.B. Popup
  this.header.toolBox.setHorizontalAlignment(-1);
};

// FIXME das ist auch etwas seltsam, besser wäre es hier wenn man den bench entweder komplett ersetzen könnte
// (widget) oder immerhin auf dem bench eine Methode setContent vorhanden wäre.
videogames.Desktop.prototype._renderGamesPanel = function() {
  this.gamesPanel.render(this.bench.$container);
};

videogames.Desktop.prototype._renderInfoPanel = function() {
  this.infoPanel.render(this.bench.$container);
};

videogames.Desktop.prototype._onMainMenuAction = function(event) {
  var leftX = scout.graphics.getSize(this.$container).width;

  // FIXME: irgendwie ist es schweine kompliziert ein popup zu machen. Wenn ich Scout nicht ein
  // bisschen kennen würde wäre ich vermutlich daran verzweifelt. Dinge die mit etwas CSS ganz einfach
  // sind, sind plötzlich schwierig. Und anstatt einfach CSS auszuprobieren, muss ich häufig die API
  // der Scout widgets studieren oder mir den Source-Code davon anschauen. Aber vielleicht hilft hier eine gute
  // Doku mit vielen Beispieln auch?
  this.vgMenu = scout.create('videogames.Menu', {
    parent: this,
    $anchor: this.mainMenu.$container,
    windowPaddingX: 0, // FIXME: oh mann :-( ewig gesucht
    location: {
      x: 0,
      y: 0
    }
  });
  this.vgMenu.setCssClass('slide-in');
  this.vgMenu.open();
  this.vgMenu.setLocation(new scout.Point(-200, 0));
};