
import axios from 'axios';
export const getPlacesData = async (type, bounds) => {
    try {
        const options = {
            params: {
                bl_latitude: bounds.sw.lat,
                tr_latitude: bounds.ne.lat,
                bl_longitude: bounds.sw.lng,
                tr_longitude: bounds.ne.lng,
            },
            headers: {
                'x-rapidapi-key': '3fe32b9472mshc57e1b2a3533ebep188c70jsn7f6511f2403d',
                'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            },
        };

        const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, options);
        return data;
    } catch (error) {
        console.error('Error fetching places data:', error);
    }
};
