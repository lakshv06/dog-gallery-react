import axios, { AxiosResponse } from "axios";
import environmentData from "../environment-constant";
import {} from "../interfaces/global.interfaces";

class dogsAPI {
  endpoints: { [key: string]: string };

  base_url: string;

  constructor() {
    this.endpoints = {
      get_all_dogs: "https://dog.ceo/api/breeds/list/all",
      get_dog_breed_random_image: "https://dog.ceo/api/breed",
    };

    this.base_url = `${environmentData.url}`;
  }

  /**
   * Makes the API call to GET all Test.
   *
   * @returns - Returns a promise with all Tests.
   */
  getAllDogs = async (): Promise<AxiosResponse> => {
    return axios.get(this.endpoints.get_all_dogs);
  };

  getDogBreedRandomImage = async (
    breedName: string
  ): Promise<AxiosResponse> => {
    return axios.get(
      `${this.endpoints.get_dog_breed_random_image}/${breedName}/images/random`
    );
  };

  getAllSubBreedList = async (breedName: string): Promise<AxiosResponse> => {
    return axios.get(
      `${this.endpoints.get_dog_breed_random_image}/${breedName}/list`
    );
  };

  getSubBreedRandomImageUrl = async (
    breedName: string,
    subBreedName: string
  ): Promise<AxiosResponse> => {
    return axios.get(
      `${this.endpoints.get_dog_breed_random_image}/${breedName}/${subBreedName}/images/random`
    );
  };

  getBreedRandomImage = async (
    breedName: string,
    count: number
  ): Promise<AxiosResponse> => {
    return axios.get(
      `${this.endpoints.get_dog_breed_random_image}/${breedName}/images/random/${count}`
    );
  };
}
const apiService = new dogsAPI();

export default apiService;
