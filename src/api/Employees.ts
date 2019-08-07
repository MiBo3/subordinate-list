import axios from 'axios';

const url = 'http://api.additivasia.io/api/v1/assignment/employees/';

const getAllSubordinates = async (name: string) => {
    let explored: string[] = [];
    let toExplore: string[] = [];
    toExplore.push(name);

    while (toExplore.length > 0) {
        const res = await Promise.all(toExplore.map((employee: string) => {
            return axios.get(url + employee)
                .then(resp => {
                    return resp.data;
                })
                .catch(() => console.warn('Employee with name "' + employee + '" not found'))
                .finally(() => explored.push(employee));
        }));

        toExplore = res.reduce((acc, curr) => {
            return curr && curr[1]
                ? acc.concat(curr[1]['direct-subordinates']
                    .filter((sub: string) => !acc.some((emp: string) => sub === emp)))
                : acc;
        }, []);
    }

    return explored.slice(1);
};


export default getAllSubordinates;
