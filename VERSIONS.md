Version 1.0.0 - Only basic user creation supported
              - returns user data who was created as JSON
              - caught errors were printed in a generalized way

Version 1.5.0 - Authentication done
              - used bcryptJS to add salt
              - stores hashes instead of passwords (adds security)
              - used JSONWebToken to generate authorization token
              - returns username and authorization token as JSON