import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json(); // Parse the JSON body of the request
    const { email, firstName, lastName, occupation } = body;

    // Validate the incoming data (you may want to add more validation here)
    if (!email || !firstName || !occupation) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Use Prisma to create a new user in the database
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        occupation,
      },
    });

    // Return the created user in the response
    return Response.json(
      { message: "User created successfully", user },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return Response.json(
      { error: "An error occurred while creating the user" },
      { status: 500 }
    );
  }
}
