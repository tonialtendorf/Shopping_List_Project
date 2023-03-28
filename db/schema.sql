DROP DATABASE IF EXISTS products_db;

CREATE DATABASE products_db;

-- -- As I mentioned during our breakout room session : The code has two get routes with the same path ("/") in lines 10-18 and 28-42. This will cause a conflict when the server is running because it doesn't know which route to use. You should remove one of these routes or change the path of one of them.
-- Assuming the first route (lines 10-18) is the intended home route, you can remove the second route (lines 28-42), which appears to be another attempt at fetching products to render on the homepage.
-- Also, in the first route (lines 10-18), you are trying to include the User model within the User model itself, which doesn't make sense. You should remove the inner object and only include the name attribute, like this:
-- const userData = await User.findAll({
--   include: [
--     {
--       model: User,
--       attributes: ['name']
--     }
--   ],
-- });
-- Finally, another issue is that the res.render method in the first route is missing the users parameter, which should be passed to the homepage template. You can fix this by updating the res.render line like this:
