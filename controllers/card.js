import NotFoundError from '../errors/NotFoundError.js.js';
import UnauthorizedError from '../errors/UnauthorizedError.js.js';
import checkErrors from '../errors/checkErrors.js';
import Card from '../models/card.js';

// GET /cards — возвращает все карточки
export const getCards = async (req, res) => {
  try {
    const cards = await Card.find({}).populate('owner');
    res.send(cards);
  } catch (err) {
    checkErrors(err, res);
  }
};

//POST /cards — создаёт карточку
export const createCard = async (req, res) => {
  try {
    const { name, link } = req.body;
    const card = await Card.create({
      name,
      link,
      owner: req.user._id,
    });
    await card.populate('owner');
    res.send(card);
  } catch (err) {
    checkErrors(err, res);
  }
};

//DELETE /cards/:cardId — удаляет карточку по идентификатору
export const deleteCard = async (req, res) => {
  try {
    const cards = await Card.findById(req.params.cardId)
      .orFail(() => new NotFoundError('card'))
      .populate('owner');
    if (cards.owner._id.toString() !== req.user._id) {
      throw new UnauthorizedError();
    }
    await cards.deleteOne();
    res.status(200).send(cards);
  } catch (err) {
    checkErrors(err, res);
  }
};

// PUT /cards/:cardId/likes — поставить лайк карточке
export const putLike = async (req, res) => {
  try {
    const cardWithUpdatedLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new NotFoundError('card'))
      .populate('owner');
    res.status(200).send(cardWithUpdatedLike);
  } catch (err) {
    checkErrors(err, res);
  }
};

// DELETE /cards/:cardId/likes — убрать лайк с карточки
export const deleteLike = async (req, res) => {
  try {
    const cardWithDeletedLike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
      .orFail(() => new NotFoundError('card'))
      .populate('owner');
    res.status(200).send(cardWithDeletedLike);
  } catch (err) {
    checkErrors(err, res);
  }
};
