export const sortData = (data) => {

    const sortedData = [...data];

console.log("UTILS" , sortedData);

    sortedData.sort((a,b) => {

        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    })
    return sortedData;

    // you could do the sort as a one liner
    //return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));

}