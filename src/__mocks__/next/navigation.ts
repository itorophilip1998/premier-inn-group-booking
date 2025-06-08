export const useRouter = () => ({
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
});

export const usePathname = () => "/en-GB";

export const useSearchParams = () => new URLSearchParams();

export const useParams = () => ({ locale: "en-GB" });
