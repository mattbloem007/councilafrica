const { buildSchema } = require('graphql')
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLDate = require('graphql-date');
var MemberModel = require('./model/member');
var UserModel = require('./model/users');
const bcrypt = require('bcrypt');
const saltRounds = 10;

function log(params) {
  return new Promise(function (resolve , reject) { 
    let test = false; 
   let userDetails = [];
   UserModel.find({username: params.username})
   .then((user) => {
    bcrypt.compare(params.password, user[0].password, function(err, res) {
        if(res) 
          resolve(user)
        else
          reject(new Error("Wrong password"))
      })
   })
  })
}


var userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      username: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      rightsLogin: {
        type: GraphQLBoolean
      }
    }
  }

});

var memberType = new GraphQLObjectType({
  name: 'member',
  fields: function () {
    return {
      _id: {
        type: GraphQLString
      },
      firstname: {
        type: GraphQLString
      },
      lastname: {
        type: GraphQLString
      },
      dateofbirth: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      cellno: {
        type: GraphQLString
      },
      race: {
        type: GraphQLString
      },
      gender: {
        type: GraphQLString
      },
      country: {
        type: GraphQLString
      },
      province: {
        type: GraphQLString
      },
      city: {
        type: GraphQLString
      },
      occupation: {
        type: GraphQLString
      },
      industry: {
        type: GraphQLString
      },
      education: {
        type: GraphQLString
      },
      income: {
        type: GraphQLString
      },
      alc_brands: {
        type: GraphQLString
      },
      tob_brands: {
        type: GraphQLString
      },
      intrests: {
        type: GraphQLString
      },
      myshopping: {
        type: GraphQLString
      },
      recruit: {
        type: GraphQLString
      }
    }
  }
});

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      members: {
        type: new GraphQLList(memberType),
        resolve: function () {
          const members = MemberModel.find().exec()
          if (!members) {
            throw new Error('Error')
          }
          return members
        }
      },
      member: {
        type: memberType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const memberDetails = MemberModel.findById(params.id).exec()
          if (!memberDetails) {
            throw new Error('Error')
          }
          return memberDetails
        }
      },
        users: {
          type: new GraphQLList(userType),
          resolve: function() {
            const users = UserModel.find().exec()
            if(!users) {
              throw new Error('Error')
            }
            return users
          }
        },
        user: {
          type: userType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
        resolve: function (root, params) {
          const userDetails = UserModel.findById(params.id).exec()
          if (!userDetails) {
            throw new Error('Error')
          }
          return userDetails
        }
      }
        
    }
  }
});

var mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      login: {
        type: userType,
        args: {
          username: {
            type: GraphQLString
          },
          password: {
            type: GraphQLString
          }
        },
        resolve: async function (root, params) {
            let user = await log(params)
            .then((ret) => {
              //console.log(ret)
            })
            .catch((err) => {
              throw err;
            })

           
            return UserModel.findOne({username: params.username}).exec()
        }

      },
      addUser: {
        type: userType,
        args: {
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve: function (root, params) {
          let newParams = {};
          bcrypt.hash(params.password, saltRounds).then(function(hash) {
            newParams = {username: params.username, email: params.email, password: hash};
            console.log(newParams)
            const userModel = new UserModel(newParams);

            const newUser = userModel.save();
            if (!newUser) {
              throw new Error('Error');
            }
            return newUser

            });    
        }
      },
      removeUser: {
        type: userType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remUser = UserModel.findByIdAndRemove(params.id).exec();
          if (!remUser) {
            throw new Error('Error')
          }
          return remUser;
        }
      },
      updateUser: {
        type: userType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          username: {
            type: new GraphQLNonNull(GraphQLString)
          },
          email: {
            type: new GraphQLNonNull(GraphQLString)
          },
          password: {
            type: new GraphQLNonNull(GraphQLString)
          },
          rightsLogin: {
            type: new GraphQLNonNull(GraphQLBoolean)
          }
        },
        resolve(root, params) {
          return UserModel.findByIdAndUpdate(params.id, { username: params.username, email: params.email, password: params.password }, function (err) {
            if (err) return next(err);
          });
        }
      },
      addMember: {
        type: memberType,
        args: {
          firstname: {
        	type: new GraphQLNonNull(GraphQLString)
	      },
	      lastname: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      dateofbirth: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      email: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      cellno: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      race: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      gender: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      country: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      province: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      city: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      occupation: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      industry: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      education: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      income: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      alc_brands: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      tob_brands: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      intrests: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      myshopping: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      recruit: {
	        type: new GraphQLNonNull(GraphQLString)
	      }
        },
        resolve: function (root, params) {
          const memberModel = new MemberModel(params);
          const newMember = memberModel.save();
          if (!newMember) {
            throw new Error('Error');
          }
          return newMember
        }
      },
      updateMember: {
        type: memberType,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
          },
          firstname: {
        	type: new GraphQLNonNull(GraphQLString)
	      },
	      lastname: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      dateofbirth: {
	        type: new GraphQLNonNull(GraphQLDate)
	      },
	      email: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      cellno: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      race: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      gender: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      country: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      province: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      city: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      occupation: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      industry: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      education: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      income: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      alc_brands: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      tob_brands: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      intrests: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      myshopping: {
	        type: new GraphQLNonNull(GraphQLString)
	      },
	      recruit: {
	        type: new GraphQLNonNull(GraphQLString)
	      }
        },
        resolve(root, params) {
          return MemberModel.findByIdAndUpdate(params.id, { firstname: params.firstname, lastname: params.lastname, dateofbirth: params.dateofbirth, email: params.email, cellno: params.cellno, race: params.race, gender: params.gender, country: params.country, province: params.province, city: params.city, occupation: params.occupation, gender: params.gender, country: params.country, province: params.province, city: params.city, occupation: params.occupation, industry: params.industry, education: params.education, income: params.income, alc_brands: params.alc_brands, tob_brands: params.tob_brands, intrests: params.intrests, myshopping: params.myshopping, recruit: params.recruit }, function (err) {
            if (err) return next(err);
          });
        }
      },
      removeMember: {
        type: memberType,
        args: {
          id: {
            type: new GraphQLNonNull(GraphQLString)
          }
        },
        resolve(root, params) {
          const remMember = MemberModel.findByIdAndRemove(params.id).exec();
          if (!remMember) {
            throw new Error('Error')
          }
          return remMember;
        }
      }
    }
  }
});

module.exports = new GraphQLSchema({query: queryType, mutation: mutation});

// const members = [
//   {
//        id: 1,
//    	   firstname: "Matt",
//   	   lastname: "Bloem",
// 	   dateofbirth: "19/09/2019",
// 	   email: "mattb007@gmail.com",
// 	   cellno: "0832935904",  
// 	   race: "Coloured",
// 	   gender: "Male",
// 	   country: "South Africa",
// 	   province: "Gauteng",
// 	   city: "Muldersdrift",
// 	   occupation: "Software Dev",
// 	   industry: "IT",
// 	   education: "Degree",
// 	   income: "lots",
// 	   alc_brands: "N",
// 	   tob_brands: "Y",
// 	   intrests: "Sports",
// 	   myshopping: "You like to buy products that are economical and suit your pocket",
// 	   recruit: "Y"
//   }
// ];

// const ourSchema = buildSchema(`
//   	type Query {
//    		members: [Member]
//    		member(id: ID): Member 
// 	}
// 	type Member { 
// 	   id: ID
// 	   firstname: String
//   	   lastname: String
// 	   dateofbirth: String
// 	   email: String
// 	   cellno: String  
// 	   race: String
// 	   gender: String
// 	   country: String
// 	   province: String
// 	   city: String
// 	   occupation: String
// 	   industry: String
// 	   education: String
// 	   income: String
// 	   alc_brands: String
// 	   tob_brands: String
// 	   intrests: String
// 	   myshopping: String
// 	   recruit: String
// 	}
// 	type User{ 
// 	    _id: ID
// 	    username: String
// 	    email: String
// 	    password: String 
// 	}
//  	input memberinput{ 
// 		firstname: String,
//   	    lastname: String,
// 	    dateofbirth: String,
// 	    email: String,
// 	    cellno: String,   
// 	    race: String,
// 	    gender: String,
// 	    country: String,
// 	    province: String,
// 	    city: String,
// 	    occupation: String,
// 	    industry: String,
// 	    education: String,
// 	    income: String,
// 	    alc_brands: String,
// 	    tob_brands: String,
// 	    intrests: String,
// 	    myshopping: String,
// 	    recruit: String
// 	}
// 	input userinput{ 
// 	   username: String
// 	   email: String
// 	   password: String
// 	}
// 	type Mutation { 
// 		createUser(userInput: userinput): User!
// 	    createMember(memberInput: memberinput): Member!
// 	    deleteMember(_id: ID): Member
// 	}
// `);

// const resolver = {
//    members: () => members, // returned members array
//    member: ({ id }) => members[id - 1], // returned single member by id
//    createMember: ({ input }) => { // destructure input from param
//    const member = { //create note
//      id: members.length + 1, // id will be notes array count that increments with each add
//    	   firstname: input.firstname,
//   	   lastname: input.lastname,
// 	   dateofbirth: input.dateofbirth,
// 	   email: input.email,
// 	   cellno: input.cellno,  
// 	   race: input.race,
// 	   gender: input.gender,
// 	   country: input.country,
// 	   province: input.province,
// 	   city: input.city,
// 	   occupation: input.occupation,
// 	   industry: input.industry,
// 	   education: input.education,
// 	   income: input.income,
// 	   alc_brands: input.alc_brands,
// 	   tob_brands: input.tob_brands,
// 	   intrests: input.intrests,
// 	   myshopping: input.myshopping,
// 	   recruit: input.recruit
//    };
//    members.push(member); 
//    return member;// return the note you just created
//    }
// };

// module.exports = {
// ourSchema,
// resolver
// };