import axios from 'axios';

const url = 'http://api.additivasia.io/api/v1/assignment/employees/';

const getAllSubordinates = async (name: string) => {
    let explored: string[] = [];
    let toExplore: string[] = [];
    toExplore.push(name);

    while (toExplore.length > 0) {
        // make a call for every unexplored name and wait for the results
        const res = await Promise.all(toExplore.map((employee: string) => {
            return axios.get(url + employee)
                .then(resp => {
                    return resp.data;
                })
                .catch(() => console.warn('Employee with name "' + employee + '" not found'))
                .finally(() => explored.push(employee));
        }));

        // create new list of unexplored names in the tree structure while filtering out duplicates
        toExplore = res.reduce((acc, curr) => {
            return curr && curr[1]
                ? acc.concat(curr[1]['direct-subordinates']
                    .filter((sub: string) => !acc.some((accSub: string) => sub === accSub)))
                : acc;
        }, []);
    }

    // first name is the input name
    return explored.slice(1);
};

export default getAllSubordinates;
