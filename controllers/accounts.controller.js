const prisma = require("../config/prisma");

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await prisma.bank_accounts.findMany();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAccountById = async (req, res) => {
  try {
    const { id } = req.params;
    const account = await prisma.bank_accounts.findUnique({
      where: {
        id: id,
      },
    });
    res.json(account);
  } catch (error) {
    res.status(400).json({ error: "account id not found" });
  }
};

const createAccount = async (req, res) => {
  try {
    const { account_name, account_number, balance, userId } = req.body;
    console.log("Request Body:", req.body);

    // Validasi input
    if (!account_name || !account_number || !balance || !userId) {
      return res.status(400).json({
        error: "Account Name, Account Number, Balance and userId are required",
      });
    }
    const account = await prisma.bank_accounts.create({
      data: {
        account_name,
        account_number,
        balance,
        userId,
      },
    });
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
};
