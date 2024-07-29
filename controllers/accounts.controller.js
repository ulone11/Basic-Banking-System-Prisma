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
    if (!account) {
      return res.status(400).json({ error: "Account id not found" });
    }
    res.json(account);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createAccount = async (req, res) => {
  try {
    const { account_name, account_number, balance, userId } = req.body;
    console.log("Request Body:", req.body);

    // Validasi input
    if (!account_name || !account_number || !balance || !userId) {
      return res.status(400).json({
        error: "Account Name, Account Number, Balance, and userId are required",
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

const updateAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { account_name, account_number, balance } = req.body;
    console.log(req.body);

    const existingAccount = await prisma.bank_accounts.findUnique({
      where: { id: id },
    });
    if (!existingAccount) {
      return res.status(400).json({ error: "Account not found" });
    }

    const updatedData = {
      account_name: account_name || existingAccount.account_name,
      account_number: account_number || existingAccount.account_number,
      balance: balance || existingAccount.balance,
    };

    const updatedAccount = await prisma.bank_accounts.update({
      where: { id: id },
      data: updatedData,
    });
    res.json(updatedAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAccount = await prisma.bank_accounts.delete({
      where: { id: id },
    });
    res.json(deleteAccount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
};
