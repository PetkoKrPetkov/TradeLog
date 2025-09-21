const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema(
  {
    ticker: { type: String, required: true, trim: true },
    date: { type: String, required: true, trim: true },
    trade_direction: { type: String, required: true, trim: true },
    entry: { type: Number, required: true, min: 0 },
    exit: { type: Number, required: true, min: 0 },
    volume: { type: Number, required: true, min: 0 },
    support: { type: String, required: true, trim: true },
    ma: { type: String, required: true, trim: true },
    price_action: { type: String, required: true, trim: true },
    oscilators: { type: String, required: true, trim: true },
    notes: { type: String, default: '' },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    imageUrl: { type: String, default: '' },
    entryPrice: { type: Number, default: 0 },
    exitPrice: { type: Number, default: 0 },
    profitLoss: { type: Number, default: 0 },
    _ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

tradeSchema.method('toClient', function () {
  return {
    _id: this._id.toString(),
    ticker: this.ticker,
    date: this.date,
    trade_direction: this.trade_direction,
    entry: this.entry,
    exit: this.exit,
    volume: this.volume,
    support: this.support,
    ma: this.ma,
    price_action: this.price_action,
    oscilators: this.oscilators,
    notes: this.notes,
    title: this.title,
    description: this.description,
    imageUrl: this.imageUrl,
    entryPrice: this.entryPrice,
    exitPrice: this.exitPrice,
    profitLoss: this.profitLoss,
    _ownerId: this._ownerId?.toString?.() || this._ownerId,
    _createdOn: this.createdAt?.getTime?.() || Date.now(),
  };
});

const Trade = mongoose.model('Trade', tradeSchema);
module.exports = Trade;

