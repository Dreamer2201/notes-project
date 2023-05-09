import axios from 'axios';
// const BASE_URL = 'https://quintadb.com.ua/apps';
// const myAPIkey = '29146874-e25e04f0bbd5e8c4fffc4a4f6';

export const fetchRequest = async () => {
    const response = await axios.get(`https://quintadb.com.ua/apps/ajiSoZW6LcJkVcV3SHeCkF/dtypes/entity/ddGCoqW6HcJio9WPyZi8ka.json?rest_api_key=cAWO09WQ9dSio3xX7cJCku&amp;view=`);
    console.log(response.data)
    return response.data;
}

export const fetchCreateNotice = async (data) => {
    console.log(data)
    let dataNew = {
   
        "json_values": data
    }

    const record = await axios.post(`https://quintadb.com.ua/apps/ajiSoZW6LcJkVcV3SHeCkF/dtypes.json?rest_api_key=cAWO09WQ9dSio3xX7cJCku`, dataNew);
    console.log(record)
    return record;
}
// curl -H 'Content-Type: application/json' -X POST -d '{"values": {"entity_id" : "ddGCoqW6HcJio9WPyZi8ka", "cre8kbWO1mW6LfWR3cQvLf":""}}' 'https://quintadb.com.ua/apps/ajiSoZW6LcJkVcV3SHeCkF/dtypes.json?rest_api_key=cAWO09WQ9dSio3xX7cJCku'

export const fetchDeleteNotice = async (id) => {

    const response = await axios.delete(`https://quintadb.com.ua/apps/ajiSoZW6LcJkVcV3SHeCkF/dtypes/${id}.json?rest_api_key=cAWO09WQ9dSio3xX7cJCku`);
    console.log(response.data)
    return response.data;
}
