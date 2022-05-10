import axios, {AxiosResponse} from 'axios';
import {CodeBlockDTO, CodeBlockResponse} from "../utils/Types/ApiTypes";

const API_ENDPOINT = `${process.env.REACT_APP_BACKEND_ENDPOINT}`;

export const getRandomCodeBlock: (codeBlockDTO: CodeBlockDTO) => Promise<AxiosResponse<CodeBlockResponse>> = async (codeBlockDTO: CodeBlockDTO) => {
  return await axios.get(`${API_ENDPOINT}/codeblocks`,{
      params: {
          ...codeBlockDTO
      }
  });
}