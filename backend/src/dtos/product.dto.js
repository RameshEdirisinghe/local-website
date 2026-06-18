const Joi = require('joi');

const productSchema = Joi.object({
  id: Joi.string().regex(/^[a-z0-9_-]+$/).required(),
  name: Joi.string().required(),
  sinhala: Joi.string().allow(''),
  tagline: Joi.string().allow(''),
  description: Joi.object({
    EN: Joi.string().allow(''),
    SI: Joi.string().allow(''),
  }).required(),
  image: Joi.string().uri().allow(''), // can be Base64, will be processed
  color: Joi.string().allow(''),
  grades: Joi.array().items(
    Joi.object({
      name: Joi.string().allow(''),
      desc: Joi.object({ EN: Joi.string().allow(''), SI: Joi.string().allow('') }).allow(null),
      basePriceUSD: Joi.number().min(0).allow(null),
    })
  ),
  certifications: Joi.array().items(Joi.string()),
  active: Joi.boolean().default(true),
  pitch: Joi.object({
    title: Joi.object({ EN: Joi.string().allow(''), SI: Joi.string().allow('') }).allow(null),
    text: Joi.object({ EN: Joi.string().allow(''), SI: Joi.string().allow('') }).allow(null),
  }),
  specifications: Joi.array().items(
    Joi.object({
      label: Joi.object({ EN: Joi.string().allow(''), SI: Joi.string().allow('') }).allow(null),
      value: Joi.object({ EN: Joi.string().allow(''), SI: Joi.string().allow('') }).allow(null),
    })
  ),
});

module.exports = { productSchema };
