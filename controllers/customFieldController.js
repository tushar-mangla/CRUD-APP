import { StatusCodes } from "http-status-codes";
import CustomField from "../models/CustomrFieldModel.js";

export const createCustomField = async (req, res) => {
  // console.log(req.user);
  try {
    const { groupname, section, label, type } = req.body;

    const customField = new CustomField({
      groupname,
      section,
      label,
      type,
      createdBy: req.user.userId,
    });

    await customField.save();
    res.status(201).json(customField);
  } catch (error) {
    console.error("Error creating custom field:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getCustomFieldbyId = async (req, res) => {
  const customFieldId = req.params.id;

  try {
    const customField = await CustomField.findById(customFieldId);
    if (!customField) {
      return res.status(404).json({ error: "Custom field not found" });
    }
    res.json(customField);
  } catch (error) {
    console.error("Error fetching custom field:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const getAllCustomFields = async (req, res) => {
  try {
    const userId = req.user.userId;
    const customFields = await CustomField.find({ createdBy: userId });
    res.json(customFields);
  } catch (error) {
    console.error("Error fetching custom fields:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const updateCustomFields = async (req, res) => {
  const customFieldId = req.params.id;
  const updates = req.body;

  try {
    const customField = await CustomField.findByIdAndUpdate(
      customFieldId,
      updates,
      {
        new: true,
      }
    );
    if (!customField) {
      return res.status(404).json({ error: "Custom field not found" });
    }
    res.json(customField);
  } catch (error) {
    console.error("Error updating custom field:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export const deleteCustomField = async (req, res) => {
  const customFieldId = req.params.id;

  try {
    const customField = await CustomField.findByIdAndDelete(customFieldId);
    if (!customField) {
      return res.status(404).json({ error: "Custom field not found" });
    }
    res.json({ message: "Custom field deleted successfully" });
  } catch (error) {
    console.error("Error deleting custom field:", error);
    res.status(500).json({ error: "Server error" });
  }
};
