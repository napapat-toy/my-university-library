"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { borrowBook } from "@/lib/actions/book";

interface Props {
  userId: string;
  bookId: string;
  borrowingEligibility: {
    isEligible: boolean;
    message: string;
  };
}

const BorrowBook = ({
  userId,
  bookId,
  borrowingEligibility: { isEligible, message },
}: Props) => {
  const router = useRouter();
  const [borrowing, setBorrowing] = useState(false);

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast.error("Error", {
        description: message,
        style: { backgroundColor: "white" },
      });
    }

    setBorrowing(true);

    try {
      const result = await borrowBook({ bookId, userId });

      if (result.success) {
        toast.success("Success", {
          description: "Book borrowed successfully.",
          style: { backgroundColor: "white" },
        });
        router.push("/my-profile");
      } else {
        toast.error("Error", {
          description: result.error,
          style: { backgroundColor: "white" },
        });
      }
    } catch (error) {
      toast.error("Error", {
        description: "An error occurred while borrowing the book.",
        style: { backgroundColor: "white" },
      });
    } finally {
      setBorrowing(false);
    }
  };
  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image src="/icons/book.svg" alt="book" width={20} height={20} />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing ..." : "Borrow Book"}
      </p>
    </Button>
  );
};

export default BorrowBook;
