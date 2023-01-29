import axios from 'axios';

// Set token headers
export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-access-token'] = token
    } else {
        delete axios.defaults.headers.common['x-access-token']
    }
}
 
// Formats date
 export const convertDate = (isoDate) => {
    const date = new Date(isoDate)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    const convertedDate = date.toLocaleDateString( 'en-US', options)
    return convertedDate
}

