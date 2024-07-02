import axios, { AxiosInstance } from "axios";
import { API_BASE } from "../config/config";

class APIService {
  
  public http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: API_BASE
    })
  }
}

export {
  APIService
}