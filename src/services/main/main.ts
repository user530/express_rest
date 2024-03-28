export const getWelcomeInfo = () => {
    return {
        meta: {
            apiVersion: "1.0",
            documentation: "http://mydomain.com/api/documentation",
        },
        _links: {
            self: {
                href: "http://mydomain.com/api/v1",
                method: "GET",
            },
            users: {
                href: "http://mydomain.com/api/v1/users",
                method: "GET",
            },
            register: {
                href: "http://mydomain.com/api/v1/auth/register",
                method: "POST",
            },
            login: {
                href: "http://mydomain.com/api/v1/auth/login",
                method: "POST",
            }
        }
    };
}