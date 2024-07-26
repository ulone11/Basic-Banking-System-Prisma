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
    if (!email || !name || !password) {
      return res.status(400).json({
        error: "Email, name, password, are required",
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

const updateUsersWithProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name, password, phone_number, address } = req.body;
    console.log("request body", req.body);
    const update = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        email,
        name,
        password,
        profile: {
          upsert: {
            create: {
              phone_number,
              address,
            },
            update: {
              phone_number,
              address,
            },
          },
        },
      },
      include: {
        profile: true,
      },
    });
    res.json(update);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUsersById = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.users.delete({
      where: { id },
    });

    res.status(204).json({ Status: "Data has been deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  createUserWithProfile,
  updateUsersWithProfile,
  deleteUsersById,
};
