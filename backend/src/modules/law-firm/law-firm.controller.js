import * as firmService from "./law-firm.service.js";

export const getFirm = async (req, res) => {
  const firm = await firmService.getFirm();

  res.status(200).json({
    success: true,
    message: "Firm fetched successfully",
    data: {
      firm
    }});
};

export const updateFirm = async (req, res) => {
  const data = req.validated.body
  console.log(data,req.media);
  const firm = await firmService.updateFirm({
    data,
    media:req.media,
    user:req.user
  });

  res.status(200).json({
    success: true,
    message: "Firm updated successfully",
    data: {
      firm
    }});
};