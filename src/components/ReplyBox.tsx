import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { usePostReply } from "@/hooks/usePostReply";
import { Button } from "./ui/Button";
import { Textarea } from "./ui/Textarea";

export function ReplyBox({ storyId }: { storyId: string }) {
  const { user } = useAuth();
  const [body, setBody] = useState("");
  const replyMut = usePostReply();

  if (!user) {
    return (
      <Link
        to={`/login?next=${encodeURIComponent(`/h/${storyId}`)}`}
        className="text-sm underline hover:text-indigo mt-4 inline-block"
      >
        Inicia sesión para responder
      </Link>
    );
  }

  const handleSubmit = () => {
    replyMut.mutate(
      { storyId, body },
      {
        onSuccess: () => setBody(""),
      },
    );
  };

  return (
    <div className="mt-4">
      <Textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        maxLength={500}
        rows={3}
        placeholder="Tu respuesta..."
        showCounter
      />
      <div className="flex justify-end mt-2">
        <Button
          onClick={handleSubmit}
          disabled={replyMut.isPending || body.trim().length === 0}
        >
          {replyMut.isPending ? "..." : "Responder"}
        </Button>
      </div>
    </div>
  );
}
