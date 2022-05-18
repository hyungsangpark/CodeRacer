import axios, {AxiosResponse} from 'axios';
import {
  CodeBlockDTO,
  CodeBlockResponse,
  AvatarResponse,
  UserProfile,
  CreateMatchHistoryItem,
  CodeBlock
} from "../utils/Types/ApiTypes";

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

export const getRandomCodeBlock: (codeBlockDTO: CodeBlockDTO) => Promise<AxiosResponse<CodeBlockResponse>> = async (codeBlockDTO: CodeBlockDTO) => {
  return await axios.get(`${API_ENDPOINT}/codeblocks`,{
      params: {
          ...codeBlockDTO
      }
  });
}
export const getRandomAvatar: () => Promise<AxiosResponse<AvatarResponse>> = async () => {
  return await axios.get(`${API_ENDPOINT}/avatar`);
}

export const getUser: (token: string) => Promise<AxiosResponse<UserProfile>> = async (token: string) => {
  return await axios.get(`${API_ENDPOINT}/user`, {
      headers: {
          Authorization: `bearer ${token}`
      }
  });
}

export const postSoloMatchHistoryResults = async (createMatchHistoryItem :CreateMatchHistoryItem, token: string) => {
  return await axios.post(`${API_ENDPOINT}/match-history/solo`, createMatchHistoryItem, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
}

export const getAllAvatars = async () => {
  return await axios.get(`${API_ENDPOINT}/avatar/all`);
}

export const setUserAvatar: (token: string, avatarId: string) => Promise<AxiosResponse<string>> = async (token: string, avatarId: string) => {
  return await axios.post(`${API_ENDPOINT}/avatar/setAvatar`, {avatarId}, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
}

export const getCodeBlock: (codeBlockId: string) => Promise<AxiosResponse<{codeBlock: CodeBlock}>> = async (codeBlockId: string) => {
  return await axios.get(`${API_ENDPOINT}/codeblocks/${codeBlockId}`);
}