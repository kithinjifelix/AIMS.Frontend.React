import { apiRoutes } from "../apiRoutes";
import axios from "axios";

export const saveIndicatorThematicAreas = async (values) => {
  return await axios.post(
    `${apiRoutes.indicatorThematicArea}/AddRange`,
    values
  );
};
