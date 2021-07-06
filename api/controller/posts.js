const {GraphQLClient} = require("graphql-request");

exports.productByDay = async (req, res) => {
    if (!req.query.date) {
        res.status(400).send({
            date: `Look your date is ${req.query.date}`,
            message: "You must put a date !",
        });
        return;
    }

    const endpoint = "https://api.producthunt.com/v2/api/graphql";
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: `Bearer ${process.env.PH_ACCESS_TOKEN}`,
        },
    });
    const cursor = req.query.cursor || "";
    const date = req.query.date;
    let start = new Date(date);
    let end = new Date(date);

    start.setUTCHours(0, 0, 0, 0);
    end.setUTCHours(23, 59, 59, 999);

    const query = `{
      posts(postedAfter: "${start.toUTCString()}", postedBefore: "${end.toUTCString()}", after: "${cursor}") {
        edges {
        node {
          name
          createdAt
          description
          url
          thumbnail{
            url
          }
          website
          topics () {
              edges {
              cursor
              node {
                name
              }
            }
          }
        }
        cursor
        }
        totalCount
      }
    }`;

    const {data} = await graphQLClient.rawRequest(query);

    return data.posts;
};
