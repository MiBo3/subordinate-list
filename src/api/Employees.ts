import axios from 'axios';

const url = 'http://api.additivasia.io/api/v1/assignment/employees/';

const getAllSubordinates = async (name: string) => {
    let explored: string[] = [];
    let toExplore: string[] = [];

    const getSubordinates = async () => {
        while (toExplore.length > 0) {
            const res = await Promise.all(toExplore.map((emp: string) => {
                return axios.get(url + emp)
                    .then(resp => {
                        return resp.data;
                    })
                    .catch(err => console.warn(err))
                    .finally(() => explored.push(emp));
            }));

            toExplore = res.reduce((acc, curr) => {
                return curr[1]
                    ? acc.concat(curr[1]['direct-subordinates']
                        .filter((sub: string) => !acc.some((expl: string) => sub === expl)))
                    : acc;
            }, []);
        }
        return explored.slice(1);
    };

    toExplore.push(name);
    return getSubordinates();
};


export default getAllSubordinates;
