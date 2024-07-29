"use client";
import { Button, Flex, Typography } from "antd";
import React, { useEffect, useState } from "react";
import Iconify from "../Iconify";
import { HappyProvider } from "@ant-design/happy-work-theme";
import { useUser } from "@clerk/nextjs";
import { updatePostLike } from "@/actions/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateQueryCacheLikes } from "@/utils";
import confetti from "canvas-confetti"; // Import canvas-confetti

const LikeButton = ({ postId, likes, queryId }) => {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(likes?.some((like) => like?.authorId === user?.id));
  }, [user, likes]);

  const actionType = isLiked ? "unlike" : "like";
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (postId, actionType) => updatePostLike(postId, actionType),
    onMutate: async () => {
      await queryClient.cancelQueries(["posts", queryId]);
      const previousPosts = queryClient.getQueryData(["posts", queryId]);

      queryClient.setQueryData(["posts", queryId], (old) => ({
        ...old,
        pages: old.pages.map((page) => ({
          ...page,
          data: page.data.map((post) => (post.id === postId
            ? {
              ...post,
              likes: updateQueryCacheLikes(
                post.likes,
                postId,
                user.id,
                actionType
              ),
            }
            : post)),
        })),
      }));

      return { previousPosts };
    },
    onError: (err, variables, context) => {
      console.log("this is error", err);
      queryClient.setQueryData(["posts"], context.previousPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  const handleLikeClick = () => {
    mutate(postId, actionType);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.5 },
    });
  };

  return (
    <HappyProvider>
      <Button
        size="small"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
        
      >
        <Flex gap={".2rem"} align="center">
          <Iconify
            icon="ph:heart-fill"
            width={"50px"}
            style={{ color: isLiked ? "var(--primary)" : "grey" }}
          />
          <Typography.Text className="typoBody2">
            {likes?.length === 0 ? " " : `${likes?.length} `}
            
          </Typography.Text>
        </Flex>
      </Button>

      <Button
        size="small"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
        onClick={handleLikeClick}
      >
        <Flex gap={".3rem"} align="center">
          <Iconify
            icon="twemoji:smiling-cat-with-heart-eyes"
            width={"40px"}
            style={{ color: isLiked ? "var(--primary)" : "grey" }}
          />
        </Flex>
      </Button>

      <Button
        size="small"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
        onClick={handleLikeClick}
      >
        <Flex gap={".3rem"} align="center">
          <Iconify
            icon="twemoji:dog-face"
            width={"40px"}
            style={{ color: isLiked ? "var(--primary)" : "grey" }}
          />
        </Flex>
      </Button>

      <Button
        size="small"
        style={{ background: "transparent", border: "none", boxShadow: "none" }}
        onClick={handleLikeClick}
      >
        <Flex gap={".5rem"} align="center">
          <Iconify
            icon="emojione:unicorn-face"
            width={"40px"}
            style={{ color: isLiked ? "var(--primary)" : "grey" }}
          />
        </Flex>
      </Button>

    </HappyProvider>
  );
};

export default LikeButton;
