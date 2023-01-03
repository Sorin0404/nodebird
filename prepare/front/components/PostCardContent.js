import React from "react";

import PropTypes from "prop-types";
import Link from "next/link";

const PostCardContent = ({ postData }) => {
  //"첫 번째 게시글 #해시태그 #익스프레스"

  return (
    <div>
      {postData.split(/(#[^s#]+)/g).map((v, i) => {
        if (v.match(/(#[^s#]+)/)) {
          return (
            <Link href={`/hashtag/${v.slice(1)}`} key={i}>
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })}
    </div>
  );
};

PostCardContent.prototypes = {
  postData: PropTypes.string.isRequired,
};

export default PostCardContent;