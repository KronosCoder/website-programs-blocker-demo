-- ============================================================
-- Seed websites for ALL rooms (Building 9, Floors 2-4)
-- Same website list, duplicated across every room
-- ============================================================

INSERT INTO websites (url, room_id)
SELECT w.url, r.id
FROM (
    VALUES
        ('friv.net'),
        ('y8.com'),
        ('poki.com'),
        ('crazygames.com'),
        ('kongregate.com'),
        ('miniclip.com'),
        ('armorgames.com'),
        ('newgrounds.com'),
        ('slither.io'),
        ('agar.io'),
        ('krunker.io'),
        ('diep.io'),
        ('th.y8.com'),
        ('store.steampowered.com'),
        ('playhop.com/th')
) AS w(url)
CROSS JOIN rooms r;
