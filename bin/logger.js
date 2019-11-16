class Log {
  constructor(context) {
    this.context = context;
  }

  info(...msgs) {
    console.log(`> ${this.context} (info):` + " " + msgs.join(" "));
  }

  error(msg, err) {
    console.log(`> ${this.context} (error):` + " " + msg);
    if (err) console.error(err);
  }
}

module.exports = context => new Log(context);
