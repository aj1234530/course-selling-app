There are 3 models(tables-think in tables) here
FirstModel - User -  it is the main thing in our db
    -  user account is by default a student account(regular user), he can own a store after the signups
User account 
    - teacher store
    - coursepurchased(list of courses purchased)
    - and his detail
2nd Model - TeacherCourseStore
    - one one relation with the user model(table)
3rd Model - Course table  -- represent every course on our platform
    - will have one owner definitely(that is a teacher that is a user who has a store)

Next - things
1. the courseContents
