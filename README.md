# food-server

a [Sails v1](https://sailsjs.com) application


### Links

+ [Get started](https://sailsjs.com/get-started)
+ [Sails framework documentation](https://sailsjs.com/documentation)
+ [Version notes / upgrading](https://sailsjs.com/documentation/upgrading)
+ [Deployment tips](https://sailsjs.com/documentation/concepts/deployment)
+ [Community support options](https://sailsjs.com/support)
+ [Professional / enterprise options](https://sailsjs.com/enterprise)


### Version info

This app was originally generated on Thu Jun 07 2018 20:41:08 GMT+0800 (中国标准时间) using Sails v1.0.2.

<!-- Internally, Sails used [`sails-generate@1.15.25`](https://github.com/balderdashy/sails-generate/tree/v1.15.25/lib/core-generators/new). -->


This project's boilerplate is based on an expanded seed app provided by the [Sails core team](https://sailsjs.com/about) to make it easier for you to build on top of ready-made features like authentication, enrollment, email verification, and billing.  For more information, [drop us a line](https://sailsjs.com/support).


### 2018-06-12
- [ ] 1.问题一

mysql> 

select * from kidinfo_fav__recipe_fav_recipe;



id | kidinfo_fav | recipe_fav_recipe
---|---|---
1 | 4 | 4
2 | 4 | 4
3 | 4 | 4
4 | 4 | 4
5 | 4 | 5
6 | 3 | 5
7 | 5 | 5
8 | 5 | 5
9 | 4 | 5
10 | 5 | 5
11 | 4 | 5 


重复addToCollection 

### 2018-06-25
- [ ] 2.问题二

error: AdapterError: Uh oh: Unexpected error from database adapter: ER_CANT_AGGREGATE_2COLLATIONS: Illegal mix of collations (latin1_swedish_ci,IMPLICIT) and (utf8_general_ci,COERCIBLE) for operation '='


ALTER DATABASE babyfood character set utf8mb4 COLLATE utf8mb4_general_ci;
alter table recipe CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;


<!--
Note:  Generators are usually run using the globally-installed `sails` CLI (command-line interface).  This CLI version is _environment-specific_ rather than app-specific, thus over time, as a project's dependencies are upgraded or the project is worked on by different developers on different computers using different versions of Node.js, the Sails dependency in its package.json file may differ from the globally-installed Sails CLI release it was originally generated with.  (Be sure to always check out the relevant [upgrading guides](https://sailsjs.com/upgrading) before upgrading the version of Sails used by your app.  If you're stuck, [get help here](https://sailsjs.com/support).)
-->

