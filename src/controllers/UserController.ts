import AbstractController from "./AbstractController";
import User from "../entities/User";
import Hardware from "../entities/Hardware";
import Software from "../entities/Software";
import Response from "../Response";

export default class UserController extends AbstractController {

    // Defines the GET by ID method for a user.
    public get(id: number): Response {
        const user: User = {
            id,
            email: "me@email.com",
            password: "password"
        };

        return new Response(user, 200)
    }

    // Returns a list of software associated with account.
    public userSoftware(userId: number): Response{
        const mockSoftware: Software = {
            id: 1,
            name: "NetBeans",
            description: "Web application IDE"
        };

        const software = [mockSoftware];
        return new Response(software, 200)
    }

    // Returns a list of hardware associated with account.
    public userHardware(userId: number): Response{
        const mockHardware: Hardware = {
            id: 1,
            name: "PlayStation 1",
            description: "Somewhat old gaming system?"
        };

        const hardware = [mockHardware];
        return new Response(hardware, 200)
    }

    public associateHardware(data: any, userId: string): Response {
        if (!data.id) {
            return new Response({error: "Expected an id associated with a piece of hardware."}, 400);
        }

        // Mock User for testing.
        const exampleUser: User = {
            id: 1,
            email: "email@email.com",
            password: "password",
            hardware: []
        };

        // Mock Hardware object for testing.
        const exampleHardware: Hardware = {
            id: data.id,
            name: "Example II",
            description: "An example"
        };

        // Push the hardware object ot the User's hardware.
        exampleUser.hardware.push(exampleHardware);

        return new Response(exampleUser,
            201)
    }

    // Associates a piece of software with a user
    public associateSoftware(data: any, userId: string): Response {
        if(!data.id) {
            return new Response({error: "Expected a valid software ID"}, 400);
        }

        // mock user for testing, replace with a user lookup once DB is hooked up
        const mockUser: User = {
            id: 2,
            email: "user@guest.com",
            password: "emery",
            hardware: []
        }

        // mock software for testing, replace with a software lookup once DB is hooked up
        const mockSoftware: Software = {
            id: data.id,
            name: "NetBeans",
            description: "Web application IDE"
        };

        mockUser.hardware.push(mockSoftware);
        return new Response(mockUser, 201);
    }

    // Delete hardware from user
    public deleteHardware(data: any, userId: string): Response {
        if(!data.id) {
            return new Response({error: "Expected a valid hardware ID"}, 400);
        }

        // mock hardware for testing
        const mockHardware: Hardware = {
            id: 1,
            name: "Apple Newton",
            description: "Apple PDA"
        };

        // mock user for testing
        const mockUser: User = {
            id: 1,
            email: "user@user.com",
            password: "react",
            hardware: [mockHardware],
            software: []
        };

        // Check for correct user, replace when DB added.
        if(parseInt(userId, 10) !== mockUser.id) {
            return new Response("Expected valid user ID", 400);
        }

        // Check for a valid hardware id, replace when DB added.
        if(parseInt(data.id, 10) !== mockHardware.id) {
            return new Response("Expected valid hardware ID", 400);
        }

        // Finds the index of the hardware to delete from the user and removes it.
        const index: number = mockUser.hardware.findIndex(hardwareToDelete => hardwareToDelete.id.toString() === data.id);
        if(index > -1) {
            mockUser.hardware.splice(index, 1);
            return new Response(mockUser, 200);
        }

        return new Response("User does not have this hardware", 400);
    }

    public deleteSoftware(data: any, userId: string): Response {
        if(!data.id) {
            return new Response({error: "Expected a valid software ID"}, 400);
        }

        // mock software for testing
        const mockSoftware: Software = {
            id: 98,
            name: "Half-Life",
            description: "Half-Life by Valve Software, on Windows, Mac, Linux, PS2"
        };

        // mock user for testing
        const mockUser: User = {
            id: 6,
            email: "user@user.com",
            password: "drupal",
            hardware: [],
            software: [mockSoftware]
        };

        // check for correct user, replace when DB added
        if(parseInt(userId, 10) !== mockUser.id) {
            return new Response("Expected valid user ID", 400);
        }

        const index = mockUser.software.indexOf(mockSoftware);
        if(index > -1) {
            mockUser.software.splice(index, 1);
            return new Response(mockUser, 200);
        }
        return new Response("User does not have this software", 400);
    }

    // Defines the POST (creation) for a user.
    public post(data: any): Response {
        if (!((data as User).email)) {
            return new Response({error: "Does not have expected fields for a user."}, 400);
        }

        return new Response({
            id: 1,
            email: data.email
        }, 201);
    }
};