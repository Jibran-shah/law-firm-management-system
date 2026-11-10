import * as membersService from "./members.service.js"

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createMember = async (req, res) => {
  const member = await membersService.createMember({
    media:req.media,
    data:req.validated?.body,
    user: req.user
  });

  res.status(200).json({
    success:true,
    data:{
      member
    }
  })
}

/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const updateMember = async (req, res) => {
  const id = req.validated?.params?.id;
  const member = await membersService.updateMember({
    id,
    media:req.media,
    data:req.validated?.body,
    user: req.user
  });

  res.status(200).json({
    success:true,
    data:{
      member
    }
  })
}


/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getAllMembers = async (req, res) => {
  const members = await membersService.getAllMembers();
  res.status(200).json({
    success:true,
    data:{
      members
    }
  })
}


/**
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getMemberById = async (req, res) => {
  const id = req.validated?.params?.id
  const member = await membersService.getMemberById({id});

  res.status(200).json({
    success:true,
    data:{
      member
    }
  })
}