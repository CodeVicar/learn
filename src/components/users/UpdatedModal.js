// Import necessary React and Mantine components
"use client";
import React, { useState } from "react";
import { Button, Modal, Stack, Table, TextInput } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PeslacContext } from "@/contexts/PeslacContext";
import { NativeSelect } from '@mantine/core';


// Define the UpdatedModal component
const UpdatedModal = ({ user, canEdit, updateUser, selectedNull }) => {
  // Access the PeslacContext to get loading state and update loading state
  const ctx = useContext(PeslacContext);
  const router = useRouter();

  // State variables for managing form inputs
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber);

  // Function to handle user update
  const update = async () => {
    ctx.setIsLoading(true);

    // Create an object with updated user information
    const userToUpdate = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phoneNumber: phoneNumber,
    };

    // Call the updateUser function passed as a prop
    updateUser(userToUpdate);
  };

  // Return JSX for rendering the UpdatedModal
  return (
    <div>
      <Modal
        opened={user}
        onClose={selectedNull}
        title="User details"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 2,
        }}
      >
        <Stack gap="xl">
          {/* TextInputs for editing user information */}
          <TextInput
            disabled={!canEdit}
            size="md"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            disabled={!canEdit}
            size="md"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextInput
            disabled={!canEdit}
            size="md"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            disabled={!canEdit}
            size="md"
            label="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <NativeSelect
            label="Input label"
            description="Input description"
            data={["false", "true"]}
            onChange={(e) => console.log(e.target.value)}
          />
          
          {/* Button for submitting the updated user information */}
          <Button
            type="submit"
            variant="filled"
            color="rgba(1, 99, 72, 1)"
            fullWidth
            disabled={!canEdit}
            onClick={update}
            loading={ctx.isLoading}
          >
            Submit
          </Button>
        </Stack>
      </Modal>
    </div>
  );
};

// Export the UpdatedModal component
export default UpdatedModal;
