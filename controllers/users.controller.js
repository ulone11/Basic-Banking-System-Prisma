const prisma = require("../config/prisma");

const getAllUser = async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({
      where: {
        id: id,
      },
      include: {
        profile: true,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "id not found" });
  }
};

const createUserWithProfile = async (req, res) => {
  try {
    const { email, name, password, phone_number, address } = req.body;

    console.log("Request Body:", req.body);

    // Validasi input
    if (!email || !name || !password || !phone_number || !address) {
      return res
        .status(400)
        .json({
          error:
            "Email, name, password, phone number, and address are required",
        });
    }

    const user = await prisma.users.create({
      data: {
        email,
        name,
        password,
        profile: {
          create: {
            phone_number,
            address,
          },
        },
      },
      include: {
        profile: true,
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  createUserWithProfile,
};
