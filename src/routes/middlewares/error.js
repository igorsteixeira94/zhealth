import AppError from '../../errors/AppError';

export default async (error, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    if (error instanceof AppError)
      return res
        .status(error.status)
        .json({ status: 'Error', message: error.message });
    return res.status(500).json({ status: 'Error', message: error.message });
  }
  return res.status(500).json('Internal Server Error');
};
