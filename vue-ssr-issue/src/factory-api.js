import axios from "axios";
export default function createApi($axios) {
    if (typeof $axios === 'undefined') {
        $axios = axios.create({
            baseURL: '/rv1/',
            timeout: 20000
        });
    }
    return {
        searchLocation: function (query) {
            return $axios.get('location/' + query);
        }
    }
};