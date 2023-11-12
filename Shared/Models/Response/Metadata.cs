namespace Eris.Shared.Models.Response;

public record Metadata(string Type, string Title, List<Image> Artwork, List<Image> Boxart, List<Image> Storyart, string Synopsis, Episode? Episode, Season? Season);