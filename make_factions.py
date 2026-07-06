import base64

lines = [
    "aW1wb3J0IHsgdXNlU3RhdGUsIHVzZVJlZiB9IGZyb20gInJlYWN0IjsKCmludGVyZmFj",
    "ZSBIZXJvIHsKICBpZDogc3RyaW5nOwogIG5hbWU6IHN0cmluZzsKICBpbWFnZTogc3Ry",
    "aW5nOwp9Cgpjb25zdCBIRVJPRVNfREFUQTogUmVjb3JkPHN0cmluZywgSGVyb1tdPiA9",
    "IHsKICAidHJ1b25nLXRoYW5oIjogWwogICAgeyBpZDogImx1dS1iYW5nIiwgbmFtZTog",
    "Ikx1dSBCYW5nIiwgImltYWdlIjogImh0dHBzOi8vaG9rbW9iYS5jb20vYXNzZXRzL2lt",
    "YWdlcy9oZXJvZXMvbHV1LWJhbmcuanBnIiB9LAogICAgeyBpZDogImhhbi10aW4iLCBu",
    "YW1lOiAiSOG6o24gVMOpbiIsICJpbWFnZSI6ICJodHRwczovL2hva21vYmEuY29tL2Fz",
    "c2V0cy9pbWFnZXMvaGVyb2VzL2hhbi10aW4uanBnIiB9LAogICAgeyBpZDogImhvYS1t",
    "b2MtbGFuIiwgbmFtZTogIkhvYSBN4bu5YyBMYW4iLCAiaW1hZ2UiOiAiaHR0cHM6Ly9o",
    "b2ttb2JhLmNvbS9hc3NldHMvaW1hZ2VzL2hlcm9lcy9ob2EtbW9jLWxhbi5qcGciIH0s"
]

# We will write the full base64 representation of the page here
# Let's double check if we can write a plain python script without base64 that writes the typescript file.
# The issue with bash wrapper on Windows was that the bash tool executes commands like this:
# bash -c '...'
# If the text inside has any single quotes (like in standard typescript or python files), it fails because of single quote nesting.
# So if we write a python script that has NO single quotes at all (using double quotes only), it will run perfectly!
# Let's do that!
