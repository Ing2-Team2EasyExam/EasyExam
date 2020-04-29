from random import randrange


def get_random_object(queryset):
    l = queryset.count()
    if l != 0:
        idx = randrange(l)
        for i, c in enumerate(queryset):
            if i == idx:
                return c
    else:
        return None
