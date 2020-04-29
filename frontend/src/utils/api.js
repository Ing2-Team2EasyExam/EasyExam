import _ from 'lodash';

const api = process.env.REACT_APP_API;
console.log('api:', api);

export async function post(path, data={}) {
  return request('post', path, data);
}

export async function get(path, data={}) {
  return request('get', path, data);
}

export async function put(path, data={}) {
  return request('put', path, data);
}

function toFormData(data) {
  let formData = new FormData();
  _.forEach(data, (value, key) => {
    if (Array.isArray(value)) {
      value.forEach(element => {
        formData.append(key, element);
      });
    }
    else { formData.append(key, value); }
  });
  return formData;
}

export async function request(method, path, data={}) {
  const { token, multipartFormData, ...bodyData } = data;
  console.assert(!(method === 'get' && multipartFormData));
  const bodyString = JSON.stringify(bodyData, null, '\t');
  const body = method === 'get' ? undefined :
    multipartFormData ? toFormData(bodyData)
      : bodyString;

  let headers = {
    Accept: 'application/json',
    authorization: token ? `Bearer ${token}` : undefined,
  };
  if (!multipartFormData) {
    headers['Content-Type'] = 'application/json;charset=UTF-8';
  }

  console.log(`\n${method.toUpperCase()} ${path} ${multipartFormData ? 'FormData' : ''}${bodyString}`);
  console.log('headers:', headers);

  const query = method === 'get' ?
    '?' + _.map(bodyData, (value, key) => `${key}=${value}`).join('&')
    : '';
  const url = api + path + query;

  return fetch(url, {
    method, headers, body,
  }).then(async response => {
    if (!response.ok) {
      console.log(`response: status ${response.status}`)
    }

    const readJson = response.json()
      .catch(async err => ({ err }));

    readJson.then(json =>
      console.log(`response: ${JSON.stringify(json, null, '\t')}`)
    ).catch(err => {
      if (!response.ok) { throw err; }

      console.log("Response is ok but empty");
      return {};
    });

    if (!response.ok) {
      console.log('response not OK');
      const json = await readJson;
      console.log(json);
      throw { ...json, status: response.status };
    }

    return readJson;
  }).catch(err => {
    if (err.message === 'Network request failed') {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 1000);
      }).then(() => {
        return post(path, data);
      }).catch(err => {
        console.log(err);
        throw err
      });
    } else {
      throw err;
    }
  });
}
