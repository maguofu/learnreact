import api from '../../api/api.config.js'
import { get } from '../utils/ajax.js'
const getMenu = get(api.API.GET_MENU);


module.exports = getMenu;