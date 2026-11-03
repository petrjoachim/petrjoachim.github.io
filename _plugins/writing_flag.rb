# frozen_string_literal: true

# While `writing.enabled` is false in _config.yml, leave the writing section
# out of the build entirely: no /writing/ page, no posts, nothing in the
# sitemap or feed. Flip the flag to publish it.
Jekyll::Hooks.register :site, :post_read do |site|
  next if site.config.dig("writing", "enabled")

  site.pages.reject! { |page| page.url.start_with?("/writing/") }
  site.posts.docs.clear
end
