import GithubSvg from "@/assets/svg/githubSvg";
import LinkedInSvg from "@/assets/svg/linkedInSvg";
function Footer() {
  return (
    <div className="bg-zinc-950 z-20 border-t text-zinc-400 text-center border-zinc-900 w-full p-2 mt-auto">
      <div className="flex items-center justify-center space-x-3 mb-2">
        <a
          href="https://www.linkedin.com/in/bilalarif2001/"
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-white duration-200"
        >
          <GithubSvg />
        </a>
        <a
          href="https://github.com/bilalarif2001"
          rel="noopener noreferrer"
          target="_blank"
          className="hover:text-white duration-200"
        >
          <LinkedInSvg />
        </a>
      </div>
      <p className="text-sm tracking-wide"> Made with ❤️ by <span className="text-violet-500 font-semibold">Bilal Arif</span></p>
    </div>
  );
}

export default Footer;
