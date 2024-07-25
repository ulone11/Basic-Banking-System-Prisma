const prisma = require("../config/prisma");

const createTransaction = async (req, res) => {
  try {
    const { amount, source_account_id, destination_account_id } = req.body;
    console.log(req.body);

    const transaction = await prisma.transactions.create({
      data: {
        amount,
        source_account_id,
        destination_account_id,
      },
    });
    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const detail = await prisma.transactions.findUnique({
      where: {
        id: id,
      },
    });
    res.json(detail);
  } catch (error) {
    res.status(400).json({ error: "transaction not found" });
  }
};

const getAllTransactions = async (req, res) => {
  try {
    const list = await prisma.transactions.findMany();
    res.json(list);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createTransaction,
  getTransactionById,
  getAllTransactions,
};
